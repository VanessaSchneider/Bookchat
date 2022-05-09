class CreateShows < ActiveRecord::Migration[6.1]
  def change
    create_table :shows do |t|
      t.string :name
      t.string :photo
      t.string :author
      t.integer :rating
      t.timestamps
    end
  end
end
