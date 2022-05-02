class ShowSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :posts
end
