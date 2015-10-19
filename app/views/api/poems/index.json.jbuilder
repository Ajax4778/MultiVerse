json.array! @poems do |poem|
  json.id poem.id
  json.title poem.title
  json.author poem.author.username
  json.first_stanza poem.stanzas.first.body
  json.last_line poem.stanzas.last.lines.last
  json.involves_current_user poem.is_contributor?(current_user)
end
