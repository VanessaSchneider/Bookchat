class PostsController < ApplicationController

    def index
        posts = Post.all
        postsordered = posts.reverse_order
        render json: postsordered, status: :ok
    end




    def show
      post= Post.find(params[:id])
      render json: post, status: :ok
    end


    def create
        post = Post.create(post_params)
        if post.valid?
          render json: post, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def getpost
        post = Post.find_by!(id: params[:id])
          if post.valid?
          render json: post, status: :ok
          else 
          render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
          end
        end





    def destroy
        post = Post.find(params[:id])
        post.destroy
        head :no_content
    end

    private

    def post_params
        params.permit(:content, :user_id, :username, :show_id, :show_name)
      

    end


end








