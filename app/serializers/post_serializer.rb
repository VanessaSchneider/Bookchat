class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :username, :show_id, :show_name

  belongs_to :user
  has_many :comments
  belongs_to :show
end
