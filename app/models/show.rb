class Show < ApplicationRecord
    has_many :posts, -> { order(created_at: :desc) }
    has_many :ratings

end

