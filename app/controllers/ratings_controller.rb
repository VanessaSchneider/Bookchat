class RatingsController < ApplicationController

    def index
        ratings = Rating.all
        render json: ratings, status: :ok
    end



    def create
        rating = Rating.create(rating_params)
        if rating.valid?
            rating.ratings_check
          render json: rating, status: :created
        else
          render json: { errors: rating.errors.full_messages }, status: :unprocessable_entity
        end
      end


      def rating_params
        params.permit(:rating, :show_id, :user_id)
    end



end
