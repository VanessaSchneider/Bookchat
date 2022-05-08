class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :post_id, :user_id, :username
  belongs_to :post
  belongs_to :user

end
