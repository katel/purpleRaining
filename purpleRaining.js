if (Meteor.isClient) {

  Lyrics = new Mongo.Collection('lyrics');
  Meteor.subscribe('lyrics');

  Template.home.helpers({
    lyrics: function() {
      var current = Session.get("current_lyric");
      // let's get a random lyric from the collection
      var random = _.sample(Lyrics.find().fetch());
      return Lyrics.find({
        _id: random && random._id
      });
    }
  });

  Template.home.events({
    'click .btn': function(event, template) {
      event.preventDefault();
      console.log("Consider this button pressed");
      Session.set("current_lyric", Random.id());
    }
  });


  Template.home.rendered = function() {
    $(".more-info").click(function () {
      $("#shelf").slideToggle("slow");
    });

  }


}


if (Meteor.isServer) {
  Meteor.startup(function() {});

  //publication for the lyrics data - service side collection
  Meteor.publish('lyrics', function() {
    var self = this;

    // Some very interesting books
    var lyrics = [{
      lyric: 'Wendy? Yes Lisa.'
    }, {
      lyric: 'There must be something wrong with the machinery'
    }, {
      lyric: 'Beautiful ones Always smash the picture Always everytime'
    },
    {
      lyric: 'I think you better close it. And let me guide you to the purple rain'
    },
    {
      lyric: 'Purple rain, Purple Rain'
    },
    {
      lyric: 'Hey, I ain\'t got no money. But honey, I\'m rich on personality'
    },
    {
      lyric: 'If you know what I\'m singing about up here C\'mon, raise your hand'
    },
    {
      lyric: 'Oh baby, I\'m a star! Might not know it now'
    },
    {
      lyric: 'I don\'t want 2 stop till I reach the top. Sing it! (We are a star!)'
    },
    {
      lyric: 'A world of never ending happiness. You can always see the sun, day or night'
    },
    {
      lyric: 'And if the elevator tries to bring you down., Go crazy (Punch a higher floor! )'
    },
    {
      lyric: 'You say you want a leader , But you can\'t seem to make up your mind'
    },
     {
      lyric: 'Honey I know, I know, I know times are changing . It\'s time we all reach out 4 something new'
    }];

    _.each(lyrics, function(lyric) {
      //document added
      self.added('lyrics', Random.id(), lyric);
    });
    //ready - all data sent.
    self.ready();


  });

}
