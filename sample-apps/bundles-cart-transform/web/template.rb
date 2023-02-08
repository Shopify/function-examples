# frozen_string_literal: true

puts
if yes?("(Re)-create app credentials? [y/N]")
  puts "Removing config/credentials.yml.enc from .gitignore..."
  gitignore = File.join(__dir__, ".gitignore")
  text = File.read(gitignore)
  text.gsub!(%r{^/config/credentials.yml.enc$}, "")
  File.open(gitignore, "w") { |file| file.puts text }

  default_editor = "code --wait"
  editor = ask("Please enter the editor to use (remember to set --wait): [#{default_editor}]")
  editor = default_editor if editor.blank?

  ENV["EDITOR"] = editor
  rails_command "credentials:edit"
end

puts
if yes?("Create and migrate database? [y/N]")
  rails_command "db:create"
  rails_command "db:migrate"
end
