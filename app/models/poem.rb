# == Schema Information
#
# Table name: poems
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  author_id   :integer          not null
#  num_stanzas :integer          default(6), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Poem < ActiveRecord::Base
  attr_reader :first_stanza

  validates :title, :author_id, :num_stanzas, presence: true
  validates :first_stanza, length: { allow_nil: true, minimum: 1 }
  after_create :ensure_first_stanza

  has_many :stanzas, inverse_of: :poem, dependent: :destroy

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id
  )

  def self.get_by_status(completion_status)
    if completion_status == :complete
      Poem.joins(:stanzas).group("poems.id")
          .having("poems.num_stanzas = COUNT(stanzas.id)")
    else
      Poem.joins(:stanzas).group("poems.id")
          .having("poems.num_stanzas > COUNT(stanzas.id)")
    end
  end

  def first_stanza=(first_stanza)
    @first_stanza_content = first_stanza
  end

  def length
    @length ||= self.stanzas.count ### database query each time?
  end

  def ensure_first_stanza
    first_stanza = Stanza.new(
      body: @first_stanza_content, order: 1, author_id: author_id, poem_id: id
    )
    first_stanza.save!
  end
end
