class ShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :rating
  has_many :posts
  has_many :ratings




end
