class CreateShows < ActiveRecord::Migration[6.1]
  def change
    create_table :shows do |t|
      t.integer :post_id

      t.timestamps
    end
  end
end
