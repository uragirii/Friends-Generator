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
In this I just replaced GRU layer with LSTM layer. LSTM models generally perform better on large datasets. Model summary is 
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

## Model 3 - 2 LSTM Layers
This time I increased the embedding dimension to 512, and added an extra layer of LSTM. This increased the depth of model and this model was able to learn deeper relation between texts. Model summary is

```
Model: "sequential_7"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
embedding_7 (Embedding)      (64, None, 512)           48128     
_________________________________________________________________
lstm_4 (LSTM)                (64, None, 1024)          6295552   
_________________________________________________________________
lstm_5 (LSTM)                (64, None, 1024)          8392704   
_________________________________________________________________
dense_7 (Dense)              (64, None, 94)            96350     
=================================================================
Total params: 14,832,734
Trainable params: 14,832,734
Non-trainable params: 0
_________________________________________________________________
```

This time no. params are also around 3 times as compared to 1 layered LSTM. The training time also increased from 42 secs to 94 secs. Thanks to Colab GPUs, training time was reduced. This time training loss was not increasing, but continously decreasing. I stopped training at 32 epochs as loss was not decreasing much.

This time, I'm not providing model checkpoints as size of repository has increased quite a much. I will upload the model as `Model_3_LSTM.h5`. This model will be used in the webinterface also. 

I also changed `temperature` value in the `generate_text()` function. This increased model's "confidence".
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

### Model 2 - LSTM Layer

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

### Model 3 - 2 Layer LSTM

This time, I changed the `temperature` value and increased the character size also. This time, model predicts 5000 characters. This gives time for us to understand if there is some plot or not. Some 2-3 lines have a simple relations. Brackets are still sometime an issue. But this time model was predicting somewhat better script.

Due to length of script, I have moved the script into files `Model_3_Output_1.txt` and `Model_3_Output_2.txt`. Starting 6-7 lines of Output 1 are given below.
```
THE ONE WITH THE BABY!
Monica: (finishing and walks back in) Hey! This is Chandler!
(Chandler starts to leave.)
Chandler: Oh, that's a good thing about six fingers!
(Ross runs into the bathroom)
Ross: Whoa-whoa-whoa! What are you doing?
Joey: Treegers, when I didnt say anything to Ross.
Phoebe: Okay I cant figure out what theyre doing.
Monica: I wanted to see you again, but Im trying to get rid of all the stuff about it.
Rachel: Yeah I know! I know! (Quietly) Wow. She was right there. So what did you think of the closet on the couch?
Rachel: What if the party still has enthustarts to cry) Oh my God! (Rushes the ball away from him.)
Mr. Geller: Have a seat son, contractions!
```

---

_The transcripts and FRIENDS TV Show are a part of Warner Bros. Production and their property._

_Special thanks to all the persons who transcribed the TV Show episodes._