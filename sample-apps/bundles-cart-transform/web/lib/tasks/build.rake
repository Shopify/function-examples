# frozen_string_literal: true

namespace :build do
  desc "Run all build tasks"
  task all: ["assets:precompile", :build_frontend_links]

  desc "Build symlinks for FE assets"
  task build_frontend_links: :environment do
    index_path = File.join(__dir__, "../../public/dist/index.html")
    assets_path = File.join(__dir__, "../../public/assets")

    File.symlink(File.join(__dir__, "../../frontend/dist/index.html"), index_path) unless File.symlink?(index_path)
    File.symlink(File.join(__dir__, "../../frontend/dist/assets"), assets_path) unless File.symlink?(assets_path)
  end
end
