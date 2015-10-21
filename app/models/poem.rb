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
  validate :poem_must_have_at_least_two_stanzas
  after_create :ensure_first_stanza

  has_many :stanzas, inverse_of: :poem, dependent: :destroy

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :author_id
  )
  has_many :contributors, -> { uniq }, through: :stanzas, source: :author

  has_many :favorites
  has_many :favoritors, through: :favorites, source: :user

  def self.get_incomplete_poems(page)
    Poem.joins(:stanzas).group("poems.id")
        .having("poems.num_stanzas > COUNT(stanzas.id)")
        .order(created_at: :desc)
        .preload(:author, :contributors, stanzas: :author)
        .page(page).per(10)
  end

  def is_contributor?(user)
    contributors.any? { |contributor| contributor == user }
  end

  def is_favoritor?(user)
    favoritors.any? { |favoritor| favoritor == user }
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

  private
  def poem_must_have_at_least_two_stanzas
    if num_stanzas <= 1
      errors.add(:poem, "must have at least two stanzas")
    end
  end
end
