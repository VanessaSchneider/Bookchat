class ShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :rating, :photo, :author
  has_many :posts
  has_many :ratings




end
