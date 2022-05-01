class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :email, :photo, :age, :bio
end
