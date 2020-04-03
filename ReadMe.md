# Friends Generator

This is just a simple RNN text generation model that generates new scripts of Friends TV Show. 

The code in `main.py` extracts all Episode Transcripts and store them in `Data/Friends_Transcript.txt`. 

The episode transcripts has been taken from [fangj](https://fangj.github.io/friends/)'s repository. The HTML files are also included in this repository. Special thanks to the persons who transcribed all the episodes.

The model 1 and much of training code is taken from [Tensorflow's official Website](https://www.tensorflow.org/tutorials/text/text_generation). 

---
## Models

### Model 1 - GRU Model
I'm using a simple RNN model using GRU layer. Model summary is printed below 
```
Model: "sequential_2"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
embedding_2 (Embedding)      (64, None, 256)           24320     
_________________________________________________________________
gru_2 (GRU)                  (64, None, 1024)          3938304   
_________________________________________________________________
dense_2 (Dense)              (64, None, 95)            97375     
=================================================================
Total params: 4,059,999
Trainable params: 4,059,999
Non-trainable params: 0
_________________________________________________________________
``` 

I trained model in batch of 64 with sequence length of 100. I trained for total of 22 epochs. The training was very slow on my CPU and it takes around `1730 secs` for each epoch. After this the loss was rising. 

I think model was unable to understand data and I would try with different batch size and an `LSTM` model. I also want to increase depth of model but this would increase training time.

I have provided the last two checkpoints and model for your reference. The checkpoint of this model in under directory `./training_checkpoints/Model_1` The Model is saved as `Model_1_GRU.h5`. 

## Model 2 - LSTM Model
In this I just replaced GRY layer with LSTM layer. LSTM models generally perform better on large datasets. Model summary is 
```
Model: "sequential"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
embedding (Embedding)        (64, None, 256)           24064     
_________________________________________________________________
lstm (LSTM)                  (64, None, 1024)          5246976   
_________________________________________________________________
dense (Dense)                (64, None, 94)            96350     
=================================================================
Total params: 5,367,390
Trainable params: 5,367,390
Non-trainable params: 0
```

This model was trained similarly, but this time I used Google Colab with GPU. This decreased the training time around 41 times! Each epoch now took `42 secs`. I trained for around 37 epochs, after that the loss was again rising.

Similary I have provided model and checkpoint data for your refrence. The checkpoint is under directory `./training_checkpoints/Model_2`, the model is saved as `Model_2_LSTM.h5`.
---
## Outputs

### Model 1 - GRU Layer

I tested model on two input strings. 
First one was `THE ONE W`. Output was
```
THE ONE WITH THE HALLISWER
Written by: Hot Monica we were talking to me and Yknow what Mike and I just imagine just either her! I did not stop me!
Joey: Of course.
Rachel walks past Monica and Chandler and Ross are there.]
Chandler: What? [Phoebe seem that Rachel and I got their numbers? Is Rachel  with me?
Joey: Yknow why, its close to him some pretty late, and French.
Joey: Yeah! (Storms away with his fult dog)
Joey: (stopping studied) What-wh-wha, ooh, I'm your ground from other price.
Rachel: Oh! That is bean before she possess it out! It's sitting next to Disney. In huge he gets caught in door) I feel.
PHOEBE: Yeah... 
   know. (Takes off his plate for the landing and he said the for amusing and he starts to hear through it and maw reasses it since the nurse at this part is that the story of my neither recovmy scientists join loudly about quite and I should talk to Joey, you and Monica: wait a minute that you kill me over on your  Celephockeng?
(Ross goes into the room)
Joey's 
```
_(1000 characters)_

The model was able to understand that episode names are capitalised and also that Character names are ended colon. But still the plot doesn't makes sense.

I also tried a different input `Monica: I know!` Output was
```
Monica: I know!
Rachel: Oh, I'm done trying to figure out his life.)
Rachel:  off back just put it now.
Chandler: Tomorrow is not one of my late downstairs and finally forgs!!
Joange for some pri-les other channel for the offics in phone?
Socrible away from me. And smart of our Gress for working going with family. You wanna know this baby?
Phoebe: Oh God, no! No, no, I dont know you need a breaks.)
Ross: So youre writing with mark!
Rachel (the nurse) There he are all standing next to the restaurant across the hall, chef Mac and-uuch is a dinosaur oica: Oh! You're gonna hear it!
Chandler: Oo is *Denni, Monica and Rachel walcos. Ross excess for some frostic and is saying going on]
Phoebe: (looking down in shame and sees preventing Ethats nervous and I didnt mean to be on my party for   hopefully your friend.
Colleptiintource and a high five out you stop your talent. 
Chandlew, you've think the went mance med at my answer.
Chandler: I'll move that.
Joey: Unlight You always felt where the t
```
_(1000 characters)_

This text is worse than before. Model has many open brackets etc. Hopefully LSTM model will fix this.

## Model 2 - LSTM Layer

Similar to previous, I fed two different inputs. First input was `THE ONE W`. Output was

```
THE ONE WITH RACHEL'S 
ClREAT)
Chandler: (to Ross) What do was lock the interrupt on the radioter of Bronna. (pause) Look, look, look!
Charl: Yeah, so beh... with Dr, you were like knocking on one of those. Phoebe, and Rachel: Still worry about your choletwow! Wow, the guy is talking to her. 
Ross: Well, you're right. I'm sorry.
Joey: That's a nice guy!
Rachel: Oh yeah.
Ross: (sees that) Look, it's not the best. It was just my know my learne never had anyone else.
Joey: Why would you stuff that thing needs?
Phoebe: Oh, ewww, cute, wait a minute, it got free parts! Ok? You get in a manknets club your freeze out?
Joey: No, that's out  it.) She just want them.
Sebastian: Let me see her tonight, her enthroom) Oh, it's gonna be just like if you feel like I never will.
Ross: Very good. You know, I stopped better... I like babies with an episode with the annulment to all the time. There's Geokay purse. 
Phoebe: Do a lot plans doing help?
Mike: Well a- Monica, Chandler, and Joey's doing something to yo
```
This time atleast it remembered to close some brackets.
Another Input was : `Monica: I know`, output was
```
Monica: I know whats going on here! Its so heally naked Rachel and Phoebe is back at Monica.]
Monica: Hey!
Phoebe: Hey, look kids back to the gang.)
Joey: Whoa, dare game, this wand makes a biteou kinda fun and match, which can him in together) Hmmmmm.
Mike: Oh my go Not naked.
Chandler: But, the kid   ica: Huh. (turns around and throws it on the last one.) (He pulls his hands up in excitedly and glares at him.) Like that is the first time and you know who the freak liosswere went down to dinner this stuff! Okay. I went on a blouse using the other would say hi to his new hand thought we were just instage.
Mike: That'll work. Most mom's up from The P... (to Monica)This is exactly, he is! Oh, slut, I don't know if it was so delling for me like that.
Ross: Look Rach, I look like we're not sitting   two   donow, so if how many uhm died  wow, I love you.
[cut to the hall]
Richard: Sandy. (Leaves.)
Joey: Is that a candle? OK, so who's not proud to work? Its us the game!
Chandler: You care enough time, (pa
```
LSTM model also performed similar to GRU model. In the model 3, I will maybe increase layers, RNN units, Embedding Dimensions.