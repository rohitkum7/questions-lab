// import React, { useState } from "react";
// import { Pencil } from "lucide-react";

// export const AccountInfo = () => {
//   const [name, setName] = useState("Richa Jha");
//   const [initialName, setInitialName] = useState("Richa Jha");
//   const [email] = useState("richa.jha@example.com");
//   const [profilePic, setProfilePic] = useState(
//     "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
//   );
//   const [initialProfilePic, setInitialProfilePic] = useState(
//     "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
//   );

//   const hasChanges = name !== initialName || profilePic !== initialProfilePic;

//   const handleSave = () => {
//     setInitialName(name);
//     setInitialProfilePic(profilePic);
//     alert("Profile updated successfully!");
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageURL = URL.createObjectURL(file);
//       setProfilePic(imageURL);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center bg-base-100 px-4">
//       {/* Profile Picture with Edit Option */}
//       <form action="">
//         <div className="relative group mb-6">
//           <div className="avatar">
//             <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//               <img src={profilePic} alt="Profile" />
//             </div>
//           </div>
//           {/* Edit Icon */}
//           <label
//             htmlFor="profile-upload"
//             className="absolute bottom-0 right-0 bg-base-300 p-1 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition"
//             title="Change Profile Picture"
//           >
//             <Pencil size={18} />
//           </label>
//           <input
//             id="profile-upload"
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="hidden"
//           />
//         </div>

//         {/* User Info Form */}
//         <div className="space-y-4 w-full max-w-sm">
//           {/* Name Field */}
//           <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
//             <legend className="fieldset-legend">Name</legend>
//             <input
//               type="text"
//               className="input input-bordered w-full"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </fieldset>

//           {/* Email Field */}
//           <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
//             <legend className="fieldset-legend">Email</legend>
//             <input
//               type="email"
//               className="input input-bordered w-full"
//               value={email}
//               disabled
//             />
//           </fieldset>

//           {/* Save Button */}
//           {hasChanges && (
//             <button className="btn btn-primary w-full" onClick={handleSave}>
//               Save Changes
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// ----------------------------------------------------------------------------------------------------

import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore"; // adjust as needed

export const AccountInfo = () => {
  const { authUser, updateProfile, isUpdating } = useAuthStore();

  const [name, setName] = useState(
    authUser?.name || "https://i.pravatar.cc/150?img=3"
  );
  const [profilePic, setProfilePic] = useState(
    authUser?.image || "https://i.pravatar.cc/150?img=3"
  );
  const [imageFile, setImageFile] = useState(null);

  const hasChanges = name !== authUser?.name || imageFile;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (name !== authUser?.name) formData.append("name", name);
    if (imageFile) formData.append("image", imageFile);

    await updateProfile(formData);
    setImageFile(null); // reset file input
  };

  return (
    <div className="flex flex-col items-center justify-center bg-base-100 px-4">
      <form onSubmit={handleSave}>
        <div className="relative group mb-6">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={profilePic} alt="Profile" />
            </div>
          </div>
          <label
            htmlFor="profile-upload"
            className="absolute bottom-0 right-13 bg-base-300 p-1 rounded-full cursor-pointer  group-hover:opacity-100 transition"
            title="Change Profile Picture"
          >
            <Pencil size={18} style={{ color: "white" }} />
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div className="space-y-4 w-full max-w-sm">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <legend className="fieldset-legend">Name</legend>
            <input
              type="text"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="email"
              className="input input-bordered w-full"
              value={authUser?.email}
              disabled
            />
          </fieldset>

          {hasChanges && (
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Save Changes"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
