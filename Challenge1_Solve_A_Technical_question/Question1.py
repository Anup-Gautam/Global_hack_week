# longest palindromic substring

""" 
Given a string s, return the longest 
palindromic substring in s.

Example 1:

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"

"""

# solution:

"""
Approach:

Creating a length checker of the result
Creating a variable to store the longest palindromic number

We will have two cases:
 Case 1: The length of the palindrome is even
   We have to start the index with a gap of 1, that being i, i+1
 Case 2: the length of the palindrome is odd
    We can start the index from the same point , i 

We will start form an index and check if the value behind and forward of the index is same
If they are same , we continur the loop , else we just leave it as it is

"""
def longestPalindrome(s):
    # length checker
    resLen = 0
    # parlindrome store
    res = ""

    for i in range(len(s)):
        # if the palindrome is odd per say
        l,r = i,i

        while l >= 0 and r <len(s) and s[l] == s[r]:
            if r-l+1 > resLen:
                resLen = r-l +1
                res = s[l:r+1]
            
            l-=1
            r+= 1
        
        # if the palindrome is even per say
        l,r = i,i+1

        while l >= 0 and r <len(s) and s[l] == s[r]:
            if r-l+1 > resLen:
                resLen = r-l +1
                res = s[l:r+1]
            
            l-=1
            r+= 1
    return res


# test case

print(longestPalindrome("babad")) # output should be bab or aba 


