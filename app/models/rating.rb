class Rating < ApplicationRecord
    belongs_to :show
    belongs_to :user

    def ratings_check
        show_id = self.show_id
        show = Show.where(id:show_id)
        all_ratings = Rating.where(show_id:show_id)
        my_ratings = all_ratings.average(:rating).to_i
        show.update(rating: my_ratings)
        end
    


end
