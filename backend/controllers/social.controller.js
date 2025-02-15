import Social from "../models/social.model.js";
import User from "../models/user.model.js"; 

// ➤ Send Friend Request
export const sendFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    if (userId === friendId) return res.status(400).json({ error: "You cannot add yourself!" });

    let social = await Social.findOne({ userId });

    if (!social) {
      social = new Social({ userId, friends: [], friendRequests: [friendId] });
    } else {
      if (social.friendRequests.includes(friendId) || social.friends.includes(friendId)) {
        return res.status(400).json({ error: "Friend request already sent!" });
      }
      social.friendRequests.push(friendId);
    }

    await social.save();
    res.status(200).json({ message: "Friend request sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send friend request" });
  }
};

// ➤ Accept Friend Request
export const acceptFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    let social = await Social.findOne({ userId });

    if (!social || !social.friendRequests.includes(friendId)) {
      return res.status(400).json({ error: "Friend request not found!" });
    }

    social.friends.push(friendId);
    social.friendRequests = social.friendRequests.filter(id => id.toString() !== friendId);
    await social.save();

    // Update friend's list
    let friendSocial = await Social.findOne({ userId: friendId }) || new Social({ userId: friendId, friends: [] });
    friendSocial.friends.push(userId);
    await friendSocial.save();

    res.status(200).json({ message: "Friend request accepted!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to accept friend request" });
  }
};

// ➤ Get Friend List
export const getFriends = async (req, res) => {
  try {
    const { userId } = req.params;
    const social = await Social.findOne({ userId }).populate("friends", "username email");
    if (!social) return res.status(404).json({ error: "No friends found!" });

    res.status(200).json(social.friends);
  } catch (error) {
    res.status(500).json({ error: "Error fetching friends" });
  }
};
