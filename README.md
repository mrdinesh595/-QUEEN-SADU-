<h1>𝐐𝐔𝐄𝐄𝐍 𝐒𝐀𝐃𝐔-𝐌𝐃</h1>

<div align="center" class= "main"> 
  <img src="https://i.ibb.co/h8fkrRF/In-Shot-20241129-183242921.jpg"width="300" height="300"/>


  <𝐌𝐑 𝐃𝐈𝐍𝐄𝐒𝐇 𝐔𝐏𝐃𝐀𝐓𝐄>


    
    
   <h1>voice aded by senuji & mihiri </h1>

    

  
## 𝟏. 𝐒𝐄𝐓 𝐔𝐏:

**👇FORK REPO(A MUST)**
<details>
<summary>𝗖𝗟𝗜𝗖𝗞 𝗛𝗘𝗥𝗘</summary>
  
- This is essential for you to obtain your own safe forked deployable repo especially heroku users.

<a href="https://github.com/mouricedevs/gifted/fork"><img src="https://img.shields.io/badge/CLICK%20HERE-purple" alt="FORK GIFTED-MD" width="150"></a>
</details>

<a><img src='https://i.imgur.com/LyHic3i.gif'/></a>

    




<b>GET SESSION ID VIA PAIR CODE 01</b>

<a href='https://pair-code-production.up.railway.app/' target="_blank"><img alt='Get Session ID' src='https://img.shields.io/badge/Click here to get your session id-blue?style=for-the-badge&logo=opencv&logoColor=white'/></a>










<b>COPY WORKFLOW CODE</b></br>
```
name: Node.js CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Start application
      run: npm start
```
