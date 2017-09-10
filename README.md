# DankTimesBot Titles Plugin

This plugin for the [DankTimesBot](https://github.com/Agadar/DankTimesBot) adds some progression to the danktimesbot score system. The plugin comes with some predifined titles but you are able to add, modify and remove these and your own titles to customize your chat. These titles will be added to the leaderboard and as result the leaderboard would look something like this:  

|---|LEADERBOARD|--- |      |   |
|---|-----------|----|------|---|
|   | Pepe's    |    |      |   |
| 1 | User1     |3710|      |   |
| 2 | User2     |2946|      |   |
| 3 | User3     |2678|(+5)  |   |
|   | Memers    |    |      |   |
| 4 | User4     |2211|(+5)  |⬆️|
| 5 | User5     |2206|      |⬇️|
|   | Wholesome |    |      |   |
| 6 | User6     |1654|(+10) |   |
| 7 | User7     |1280|      |   |
|   | Normies   |    |      |   |
| 8 | User8     |630 |      |   |
| 9 | User9     |575 |      |   |

## Commands
* **/titles**  
Returns all titles currently in your chat.  
The result corresponding with the leaderboard above would look like this:

| ID | MinRange | MaxRange | Name      |
|----|----------|----------|-----------|
| 0  | 2500     | 9999     | Pepe's    |
| 1  | 2000     | 2499     | Memers    |
| 2  | 1000     | 1999     | Wholesome |
| 3  | 0        | 999      | Normies   |


* **/add_Title [minRange] [maxRange] [name]**  
Adds a new title to your chat.  
Example: `/add_title 0 100 normie`  
Arguments:  
  * **[minRange]** Users with a score higher than this number get this title.  
  * **[maxRange]** Users with a score lower than this number get this title.  
  * **[name]** Name of the title.  

* **/modify_title [id] [minRange] [maxRange] [name]**  
Modifies an existing title.  
Example: `/modify_title 0 0 1000 normie`  
Arguments:  
  * **[id]** ID of the title to be modified.  
  * **[minRange]** the new minRange of the title in question.  
  * **[maxRange]** the new maxRange of the title in question.  
  * **[name]** the new name of the title in question.  

* **/remove_title [id]**  
Modifies an existing title.  
Example: `/remove_title 0`  
Arguments:  
  * **[id]** ID of the title to be removed.  

* **/set_titles**
Removes all existing titles and replaces them with new ones.  
This commands uses the same arguments as `/add_title` but on multiple lines.    
Example:  
```
/set_titles 0 99 title1
100 199 title2
200 299 title3
```