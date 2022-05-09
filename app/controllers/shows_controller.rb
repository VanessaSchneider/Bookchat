class ShowsController < ApplicationController

    def index
        shows = Show.all
        render json: shows, status: :ok
    end


  def show
       show = Show.find(params[:id])
        render json: show, status: :ok
    end




    def search
        show = Show.find_by!(name: params[:name])
          if show.valid?
          render json: show, status: :ok
          else 
          render json: { errors: show.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
            show = Show.find_by!(id: params[:id])
              show.update(show_params)
              if show.valid?
              render json: show, status: :ok
              else 
              render json: { errors: show.errors.full_messages }, status: :unprocessable_entity
              end
            end



        def show_params
            params.permit(:name, :author, :photo)
        end



end
