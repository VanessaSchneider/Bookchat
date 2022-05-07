class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.integer :user_id
      t.string :content
      t.string :username
      t.integer :show_id
      t.string :show_name
      t.string :image
  

      t.timestamps
    end
  end
end
