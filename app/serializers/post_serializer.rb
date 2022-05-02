class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :username

  belongs_to :user
  has_many :comments
  has_many :shows
end
