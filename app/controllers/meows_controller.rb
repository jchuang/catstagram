class MeowsController < ApplicationController
  before_filter :authenticate_user!

  def create
    post = Post.find(params[:post_id])
    meow = current_user.meows.build
    meow.post = post

    respond_to do |format|
      if meow.save
        format.html { redirect_to :back, notice: "We heard your Meow!" }
        format.json { render json: meow }
      else
        format.html { redirect_to :back }
        format.json { render json: meow.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    current_user.meows.destroy(params[:id])

    respond_to do |format|
      format.html do
        flash[:notice] = "All evidence of your meowing has been destroyed!"
        redirect_to :back
      end
      format.json { head :no_content }
    end
  end
end
