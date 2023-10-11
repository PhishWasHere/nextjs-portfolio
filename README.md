## Portfolio

A portfolio page made with [Next.js](https://nextjs.org), [TypeScript](https://www.typescriptlang.org/), CSS, [Tailwind](https://tailwindcss.com/)
</br> *Inspired by [Keita Yamada](https://p5aholic.me/)*

<details>
<summary>Table of Contents</summary>
<ul>        
    <li><a href='#getting-started'>Getting Started</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#setup">Setup</a></li>
    <li><a href="#start">Start</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li> 
</details>

_______

## Getting Started

Here is an example of how to setup this project locally.
</br>I avoided using client components to maintain SSR. If your not too fussed with that, feel free to move the components around to use the NEXT Router.

## Installation

After cloning the repo make sure you install all dependencies.
  ```sh
    in your terminal, run
        yarn
    or
        npm i
  ```

## Setup

Once all dependencies are installed, find the ***.env.local.example*** and update the following fields;

  ```sh
    EMAIL_USER= example@sender.com
    EMAIL_PASS= abcdefghijk
    EMAIL_SEND= example@receiver.com
  ```

Then rename the file to ***env.local***

Nodemailer is setup to handle Gmail accounts.
</br>The ***USER*** is the sender Gmail account, and ***PASS*** is the automation password provided by google. ***SEND*** can be any valid email account.

## Start

Use
  ```sh
        yarn dev
    or
        npm run dev
  ```
to start the dev enviroment.

_______

## License

![badge](https://img.shields.io/badge/license-MIT-brightgreen)
<br />
This application is covered by the MIT license.


## Contact

If you have any questions, you can contact me from [here](https://www.miran-yasunori.com/contact)