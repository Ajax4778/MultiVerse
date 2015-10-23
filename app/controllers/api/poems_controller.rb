class Api::PoemsController < ApplicationController
  before_action :ensure_login
  
  def index
    @poems = Poem.get_by_status(params[:status].to_sym, params[:page].to_i)
  end

  def create
    @poem = current_user.poems.new(poem_params)
    if @poem.save
      render '/api/poems/_poem', locals: {poem: @poem}
    else
      render json: @poem.errors.full_messages, status: :unprocessible_entity
    end
  end

  def show
    @poem = Poem.includes(:author, :contributors, :favoritors, stanzas: :author)
                .where('id = ?', params[:id])
                .first
    if @poem
      render :show
    else
      # send error hash to error store.
      render json: 'These are not the verses you were looking for.', status: 404
    end
  end

  def destroy
    @poem = Poem.find_by_id(params[:id])
    if @poem
      title = @poem.title
      @poem.destroy
      render json: "#{title} deleted."
    else
      render json: "Poem not found.", status: :unprocessible_entity
    end
  end

  private
  def poem_params
    params.require(:poem).permit(:title, :num_stanzas, :first_stanza)
  end
end
