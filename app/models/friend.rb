class Friend < ApplicationRecord
    belongs_to :user
    has_one :match

    def match_check
        friended_person = self.friended_person_id 
        matched_like = Friend.where(user_id: friended_person, friended_person_id: self.user_id)
        if matched_like.length > 0
              match = Match.create(friend_id: self.id, user1: self.user_id, user2: friended_person.id)
              # conversation = Conversation.create()
              # chat = Chat.create(match_id: match.id, user_id: liked_person, conversation_id: conversation.id)
              # chat2 = Chat.create(match_id: match.id, user_id: self.user_id, conversation_id: conversation.id)
              puts "match created"
            else return "this is not a match"
        end
      end
    end

