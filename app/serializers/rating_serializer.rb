class RatingSerializer < ActiveModel::Serializer
  attributes :id, :rating, :show_id, :user_id
  belongs_to :show
  belongs_to :user
end
