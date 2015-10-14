json.title @poem.title
json.author @poem.author.username
json.stanzas {json.array! @poem.stanzas do |stanza|
  json.id stanza.id
  json.order stanza.order
  json.author stanza.author.username
  json.body stanza.body
end}
