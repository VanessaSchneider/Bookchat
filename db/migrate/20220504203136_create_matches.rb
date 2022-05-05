class CreateMatches < ActiveRecord::Migration[6.1]
  def change
    create_table :matches do |t|
      t.integer :friend_id
      t.integer :user1
      t.integer :user2
      t.integer :user3
      t.integer :user4
      t.timestamps
    end
  end
end
