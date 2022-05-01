class PostsController < ApplicationController

    def index
        posts = Post.all
        render json: posts, status: :ok
    end

    
    # def show
    #     post = Post.find_by(id: session[:user_id])
    #     if user
    #       render json: user
    #     else
    #       render json: { error: "Not authorized" }, status: :unauthorized
    #     end
    #   end


    def create
        post = Post.create(post_params)
        if post.valid?
          render json: post, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

    #   def update
    #     user = User.find_by!(id: params[:id])
    #       user.update(user_params)
    #       if user.valid?
    #       render json: user, status: :ok
    #       else 
    #       render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    #       end
    #     end

    def destroy
        post = Post.find(params[:id])
        user.destroy
        head :no_content
    end

    private

    def post_params
        params.permit(:content, :user_id)
      

    end


end








