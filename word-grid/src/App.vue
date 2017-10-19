<template>
  <div id="app">
    <h1>High frequency words</h1>
    <div class="buttons">
      <button 
        v-for="(l,k) in levels" 
        :key="l.key" 
        @click="setLevel(l)"
        :class="{ 'active' : k == level.key }"
        >
        {{ l.name }}
      </button>
    </div>
    <div v-show="!level.key.length">
      Select a level from above
    </div>
    <div v-if="level.key.length">
      
      <p v-if="level.hasOwnProperty('description')">({{ level.description }})</p>
      
      <span m-l-1>Number of words: <input type="number" step="1" v-model="wordCount"></span>
      
      <div class="word-grid">
        <div v-for="word in words" class="word-cell">
          {{ word }}
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    setLevel(level) {
      this.level = level;
    },
    shuffle(a) {
      let x, t, r = new Uint32Array(1);
      for (let i = 0, c = a.length - 1, m = a.length; i < c; i++, m--) {
        crypto.getRandomValues(r);
        x = Math.floor(r / 65536 / 65536 * m) + i;
        t = a [i], a [i] = a [x], a [x] = t;
      }
      return a;
    },
    setWords() {
      if(this.level.key != "year-2" || this.level.key != "year-3") {
        this.words = this.wordList[this.level.key]
      }
      if(this.level.key == "year-2") {
        this.words = this.wordList["year-1"];
      }
      if(this.level.key == "year-3") {
        this.words = this.wordList["reception"]
          .concat(this.wordList["year-1"])
          .concat(this.wordList["year-2"]);
      }
      this.words = this.shuffle(this.words);
      this.words = this.words.slice(0, this.wordCount);
    }
  },
  watch: {
    wordCount() {
      this.setWords();
    },
    level() {
      this.setWords();
    }
  },
  data () {
    return {
      wordCount: 9,
      levels: {
        "reception" : {
          name: "Reception",
          key: "reception"
        },
        "year-1" : {
          name: "Year 1",
          key: "year-1"
        },
        "year-2" : {
          name: "Year 2",
          key: "year-2",
          description: "Same as Year 1 words"

        },
        "year-3" : {
          name: "Year 3",
          key: "year-3",
          description: "A combination of words from reception, years 1 and 2"

        },
        "year-4" : {
          name: "Year 4",
          key: "year-4"

        },
        "year-5" : {
          name: "Year 5",
          key: "year-5"

        },
      },
      level: {
        key: '',
        name: ''
      },
      words: [],
      wordList: {
        "reception": [
            "go",  "we",  "see",  "can",  "come",  "this",  "on",  "he",  "went",  "dog",  "away",  "am",  "up",  "me",  "mum",  "all",  "you",  "like",  "it",  "is",  "day",  "going",  "at",  "cat",  "was",  "big",  "play",  "get",  "look",  "she",  "no",  "said",  "are",  "and",  "yes",  "to",  "the",  "they",  "for",  "in",  "of",  "my",  "dad"
        ],
        "year-1": [
            "about", "don’t", "two", "once", "can’t", "home", "because", "take", "her", "must", "from", "way", "many", "put", "just", "but", "over", "time", "not", "half", "then", "your", "should", "love", "who", "as", "us", "one", "after", "dig", "bed", "than", "could", "house", "girl", "were", "here", "name", "last", "by", "may", "ran", "now", "has", "people", "too", "sister", "made", "there", "back", "very", "or", "will", "door", "been", "that", "again", "how", "good", "what", "did", "new", "laugh", "call", "him", "saw", "off", "called", "more", "took", "so", "have", "push", "ball", "want", "make", "these", "down", "boy", "our", "with", "if", "got", "their", "an", "next", "little", "when", "do", "school", "old", "came", "his", "tree", "some", "help", "much", "be", "water", "man", "pull", " rst", "brother", "out", "three", "jump", "had", "them", "would", "night", "live", "where", "another", "seen", "lived"
        ],
        "year-4": [
            "ask", "stopped", "first", "around", "asked", "think", "half", "below", "began", "thought", "morning", "between", "being", "told", "much", "both", "brought", "tries", "never", "different", "change", "turn", "number", "following", "coming", "turned", "often", "high", "didn't", "used", "only", "inside", "does", "walk", "second", "near", "found", "walked", "sometimes", "other", "goes", "walking", "still", "outside", "gone", "watch", "suddenly", "place", "heard", "write", "today", "right", "I'm", "woke", "until", "round", "jumped", "woken", "upon", "such", "knew", "almost", "while", "though", "know", "always", "year", "together", "leave", "any", "young", "under", "might", "before", "above", "where", "opened", "better", "across", "without", "show", "during", "along", "started", "every", "also"
        ],
        "year-5": [
            "baby", "head", "earth", "paper", "balloon", "heard", "eyes", "sister", "birthday", "something", "father", "small", "brother", "sure", "friends", "sound", "children", "swimming", "important", "white", "clothes", "those", "lady", "whole", "garden", "word", "light", "why", "great", "work", "money", "window", "happy", "world", "own"
        ]
      }
    }
  }
}
</script>

<style lang="scss">

* { box-sizing: border-box; }

$green: #19a974;
$light-green: #9eebcf;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1rem;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.buttons {
  margin: 0 auto 1rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  button {
    width: 100px;
    padding: 1rem;
    border: 1px solid $green;
    background: $light-green;
    cursor: pointer;
    outline: none;
    &:hover {
      background: darken($light-green, 10);
    }
    &.active {
      background: darken($light-green, 20);
    }
  }
}

.word-grid {
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  .word-cell {
    flex: 1 33%;
    min-width: 150px;
    padding: 1rem;
    margin: auto;
    border: 1px solid #ccc;
      
  }
}

</style>
