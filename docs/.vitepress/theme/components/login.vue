<script setup>
import { ref, onMounted, onBeforeUnmount} from "vue";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

const user = ref(null);
const showLogin = ref(true);
const showDropdown = ref(false);
const showUpdateForm = ref(false);

const email = ref("");
const password = ref("");
const errorMsg = ref("");

const displayNameInput = ref("");
const profileImageFile = ref(null);
const profileImagePreview = ref("");
const isUpdating = ref(false); // Loading state


// Your existing login function unchanged
const login = async () => {
  errorMsg.value = "";
  if (!email.value || !password.value) {
    errorMsg.value = "Please enter email and password.";
    return;
  }
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    showLogin.value = false;
    email.value = "";
    password.value = "";
  } catch (error) {
    errorMsg.value = error.message;
  }
};

// New logout function
const logout = async () => {
  showDropdown.value = false;
  await signOut(auth);
  showLogin.value = true;
  user.value = null;
};

// File input change handler for profile photo
const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    profileImageFile.value = file;
    profileImagePreview.value = URL.createObjectURL(file);
  }
};

// Update profile function
const updateProfileInfo = async () => {
  const currentDisplayName = user.value.displayName || "";
  const currentPhotoURL = user.value.photoURL || "";

  const newDisplayName = displayNameInput.value.trim();
  const newPhotoURL = profileImagePreview.value;

  // Check if any actual change is made
  const isNameChanged = newDisplayName !== currentDisplayName;
  const isPhotoChanged = newPhotoURL !== currentPhotoURL;

  if (!isNameChanged && !isPhotoChanged) {
    alert("No changes detected.");
    return;
  }

  try {
    let photoURL = currentPhotoURL;

    // For demo purposes; replace this with real upload logic if needed
    if (isPhotoChanged) {
      photoURL = newPhotoURL;
    }

    await updateProfile(auth.currentUser, {
      displayName: newDisplayName || currentDisplayName,
      photoURL,
    });

    user.value = { ...auth.currentUser };

    alert("Profile updated!");
    showUpdateForm.value = false;
    showDropdown.value = false;
  } catch (err) {
    alert("Error updating profile: " + err.message);
  }
};

// Escape key handler
const handleEscape = (event) => {
  if (event.key === "Escape") {
    showDropdown.value = false;
    showUpdateForm.value = false;
  }
};


// Watch auth state and set user info
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
    showLogin.value = !currentUser;

    if (currentUser) {
      displayNameInput.value = currentUser.displayName || "";
      profileImagePreview.value = currentUser.photoURL || "";
    }
  });
    document.addEventListener("keydown", handleEscape);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleEscape);
  if (profileImagePreview.value && profileImagePreview.value.startsWith('blob:')) {
    URL.revokeObjectURL(profileImagePreview.value);
  }
});

</script>

<template>
  <!-- Login Modal -->
    <div
      v-if="showLogin"
      style="position: fixed; top:0; left:0; width:100vw; height:100vh; background: rgba(0,0,0,0.5);
             display:flex; justify-content:center; align-items:center; z-index:1000;"
    >
      <div
        style="background: white; padding: 30px 40px; border-radius: 12px; width: 320px; box-shadow: 0 8px 20px rgba(0,0,0,0.2); font-family: Arial, sans-serif; text-align: center;"
      >
        <h3
          style="margin-bottom: 10px; font-weight: 1000; color: #e74c3c; border-bottom: 3px solid #e74c3c; display: inline-block; font-size: 20px; font-style: italic; font-family: 'Brush Script MT', cursive, 'Comic Sans MS', sans-serif;"
        >
          GEE E-Book
        </h3>

        <label style="display: block; font-weight: 600; color: #34495e; text-align: left;">E-mail</label>
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          style="width: 100%; padding: 8px 8px; margin-bottom: 20px; font-size: 16px; border: none; border-bottom: 2px solid #bdc3c7; outline: none; transition: border-color 0.3s; box-sizing: border-box; display: block;"
          @focus="event => event.target.style.borderColor = '#2980b9'"
          @blur="event => event.target.style.borderColor = '#bdc3c7'"
          autofocus
        />

        <label style="display: block; font-weight: 600; color: #34495e; text-align: left;">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="Enter your password"
          style="width: 100%; padding: 8px 8px; margin-bottom: 20px; font-size: 16px; border: none; border-bottom: 2px solid #bdc3c7; outline: none; transition: border-color 0.3s; box-sizing: border-box; display: block;"
          @focus="event => event.target.style.borderColor = '#2980b9'"
          @blur="event => event.target.style.borderColor = '#bdc3c7'"
          @keyup.enter="login"
        />

        <button
          @click="login"
          style="width: 150px; padding: 8px 0; font-size: 16px; font-weight: 600; color: white; background: linear-gradient(90deg, #2980b9, #3498db); border: none; border-radius: 10px; cursor: pointer; box-shadow: 0 4px 8px rgba(52, 152, 219, 0.5); transition: background 0.3s; margin-top: 10px; display: block; margin-left: auto; margin-right: auto;"
          @mouseover="event => event.target.style.background = 'linear-gradient(90deg, #3498db, #2980b9)'"
          @mouseout="event => event.target.style.background = 'linear-gradient(90deg, #2980b9, #3498db)'"
        >
          Submit
        </button>
        <p v-if="errorMsg" style="color: #e74c3c; margin-top: 10px;">{{ errorMsg }}</p>
      </div>
    </div>
  
    <!-- PROFILE ICON & DROPDOWN -->
    <div
    style="text-align: center; margin-left: 10px; font-family: Arial, sans-serif; position: relative; display: inline-block;"
    >
    <!-- Profile Icon -->
    <div
        @click="showDropdown = !showDropdown"
        style="width:40px; height:40px; background-color:hsla(0,0,5,0); border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold; font-size:22px; cursor:pointer; box-shadow:0 4px 8px rgba(52,152,219,0.5); overflow:hidden;"
        title="User Profile"
    >
        <img 
        v-if="user?.photoURL" 
        :src="user.photoURL" 
        style="width:100%; height:100%; object-fit:cover;"
        alt="Profile"
        >
        <span v-else style="color: red;">
        {{ (user?.displayName ? user.displayName.split(' ').map(n => n[0]).join('') : 'K').toUpperCase() }}
        </span>
    </div>

    <!-- Dropdown -->
    <div 
        v-if="showDropdown"
        style="position:absolute; top:50px; left:50%; transform:translateX(-50%); background:white; border:1px solid #ddd; border-radius:6px; box-shadow:0 8px 16px rgba(0,0,0,0.15); width:180px; z-index:1001; text-align:center; font-size:14px;"

    >
        <div style="padding:10px; border-bottom:1px solid #eee;">
        <div style="text-decoration: underline; font-weight:850; margin-bottom:4px;">{{ user?.displayName || 'User' }}</div>
        <div style="font-size:12px; color:#7f8c8d;text-decoration: underline; font-style: italic;">{{ user?.email }}</div>
        </div>

        <div style="display: flex; flex-direction: column; align-items: stretch; width: 100%;"
        >
        <button 
            v-if="!showUpdateForm"
            @click="showUpdateForm = true"
            style="display: block; width:100%; padding:10px 0; background-color:#27ae60; border:none; color:white; font-weight:500; font-size:14px; cursor:pointer;"
            @mouseover="event => event.target.style.backgroundColor = '#1e8449'"
            @mouseout="event => event.target.style.backgroundColor = '#27ae60'"
        >
            Update Profile ✍️
        </button>

        <button
            v-if="!showUpdateForm"
            @click="logout"
            style="display: block; width:100%; padding:10px 0; background-color:#e74c3c; border:none; color:white; font-weight:500; font-size:14px; border-radius:0 0 6px 6px; cursor:pointer;"
            @mouseover="event => event.target.style.backgroundColor = '#c0392b'"
            @mouseout="event => event.target.style.backgroundColor = '#e74c3c'"
        >
            Logout ⏻
        </button>
        </div>
    </div>
    </div>
  

    <!-- Update Profile Modal -->
    <div
    v-if="showUpdateForm"
    style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.5);
            display: flex; justify-content: center; align-items: center; z-index: 1000;"
    @click.self="showUpdateForm = false"
    >
    <div
        style="background: white; padding: 30px 40px; border-radius: 12px; width: 340px; box-shadow: 0 8px 20px rgba(0,0,0,0.2); font-family: Arial, sans-serif; text-align: center;"
    >
        <h3
        style="margin-bottom: 20px; font-weight: 1000; color: #e74c3c; border-bottom: 3px solid #e74c3c; display: inline-block; font-size: 20px; font-style: italic; font-family: 'Brush Script MT', cursive, 'Comic Sans MS', sans-serif;"
        >
        Update Profile
        </h3>

        <div style="margin-bottom: 20px; position: relative; display: inline-block;">
            <img
                :src="profileImagePreview"
                alt="Preview"
                style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid #27ae60;"
            />
            <label
                for="profile-upload"
                style="position: absolute; bottom: 0; right: 0; background: #2ecc71; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; cursor: pointer; border: 2px solid white;"
                title="Upload new profile image"
            >
                📸
            </label>
            <input
                id="profile-upload"
                type="file"
                accept="image/*"
                @change="onFileChange"
                style="display: none;"
            />
            </div>

        <div style="margin-bottom: 20px;">
        <label style="display: block; font-weight: 600; color: #34495e; text-align: left; margin-bottom: 5px;">Full Name</label>
        <input
            v-model="displayNameInput"
            placeholder="Enter your name"
            style="width: 100%; padding: 10px 12px; font-size: 16px; border: 1px solid #bdc3c7; border-radius: 6px; outline: none; transition: border-color 0.3s; box-sizing: border-box;"
            @focus="event => event.target.style.borderColor = '#27ae60'"
            @blur="event => event.target.style.borderColor = '#bdc3c7'"
        />
        </div>

        <div style="display: flex; gap: 10px; justify-content: center;">
        <button
            @click="updateProfileInfo"
            :disabled="isUpdating"
            style="display: block; width:100%; padding:10px 0; background-color:#27ae60; border:none; color:white; font-weight:500; font-size:14px; border-radius:0 0 6px 6px; cursor:pointer;"            
            @mouseover="event => !isUpdating && (event.target.style.background = 'linear-gradient(90deg, #1e8449, #27ae60)')"
            @mouseout="event => !isUpdating && (event.target.style.background = 'linear-gradient(90deg, #27ae60, #1e8449)')"
        >
            {{ isUpdating ? "Updating..." : "Save" }}
        </button>

        <button
            @click="showUpdateForm = false"
            @click.stop= "showDropdown = !showDropdown"
            :disabled="isUpdating"
            style="display: block; width:100%; padding:10px 0; background-color:#b3463b; border:none; color:white; font-weight:500; font-size:14px; border-radius:0 0 6px 6px; cursor:pointer;"
            @mouseover="event => !isUpdating && (event.target.style.background = 'linear-gradient(90deg, #c0392b, #e74c3c)')"
            @mouseout="event => !isUpdating && (event.target.style.background = 'linear-gradient(90deg, #e74c3c, #c0392b)')"
        >
            Exit
        </button>
        </div>
    </div>
    </div>
</template>
