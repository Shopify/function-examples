# frozen_string_literal: true

class AddRegisteredToShops < ActiveRecord::Migration[7.0]
  def change
    add_column(:shops, :registered, :boolean, default: false, null: false)
  end
end
