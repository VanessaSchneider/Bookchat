class FriendsController < ApplicationController

    def index
        friends = Friend.all
        render json: friends, status: :ok
    end

    def show
        friend = Friend.find(params[:id])
        render json: friend, status: :ok
    end

    def create
        friend = Friend.create(friend_params)
        friend.match_check
        render json: friend, status: :ok
    end
    # user_id: params[:user_id], liked_person_id: params[:liked_person_id]




    private

    def friend_params
        params.permit(:friended_person_id, :user_id)
    end
end




