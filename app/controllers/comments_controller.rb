class CommentsController < ApplicationController

    def index
        comments = Comment.all
        commentsordered = comments.reverse_order
        render json: commentsordered, status: :ok
    end


  def show
       comment = Comment.find(params[:id])
        render json: comment, status: :ok
    end


    def create
        comment = Comment.create(comment_params)
        if comment.valid?
          render json: comment, status: :created
        else
          render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # def getcomments
      #   comments = Comment.all
      #   post_comments = comments.filter{|m|m.post_id == id}
      #     render json: post_comments, status: :ok
      #   end


        def comment_params
            params.permit(:post_id, :user_id, :content, :username)
        end


end





