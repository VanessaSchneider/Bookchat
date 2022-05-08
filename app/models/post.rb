class Post < ApplicationRecord
    belongs_to :user
    has_many :comments, -> { order(created_at: :desc) }
    belongs_to :show
end



