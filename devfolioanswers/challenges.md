### Encryption/Decrpyption
The team had some trouble figuring out the ***encryption and decryption aspects*** of our reports. While not the easiest, figuring out encryption was not the most difficult feat. Decryption, on the other hand, was relatively more complex and ***took us a day's time***.

### TS to JS
Initially, we coded our backend in typescript, but then had to migrate to javascript due to the constraints thrown at us by IPFS which does not support typescript.


#### Giving Access
The team was clear during ideation that a major selling point of our project would be how the reports are ***only accessible to the intended authorized users***. The actual implementation of this, however, took a ***good amount of brainstorming***. 

### Report Deletion
The reports and the accounts that the reports are accessible share a many-to-many relation in the backend. On deletion of a report, it was easy to delete the report itself but that wasn't the case with the accounts that the report has been shared with. In the backend, it took a considerable amount of brain-racking to know that the shared report has been deleted.


### Connecting The App And The Api
Our app is built on ***React Native***, and our backend is mostly built on ***Node.js***.
The main issue we faced when building our product was connecting these two, as our app simulators did not support localhost ports, we had to use ***NGROK*** to connect the app and the api, which made it relatively difficult to collaborate.

