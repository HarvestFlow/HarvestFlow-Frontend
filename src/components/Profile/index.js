import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBSpinner
} from 'mdb-react-ui-kit';
import AppLayout from '../../layouts/AppLayout/AppLayout';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null); // State to manage the image
  const [imageUrl, setImageUrl] = useState(''); // To store the uploaded image URL
  const [imageChanged, setImageChanged] = useState(false); // To track if an image has been selected

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/getProfile", {
          withCredentials: true,
        });
        setProfile(response.data);
      } catch (err) {
        setError("Impossible de récupérer le profil.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(selectedImage.type)) {
      alert("Veuillez télécharger une image au format JPEG, PNG, ou GIF.");
      return;
    }

    if (selectedImage.size > maxSize) {
      alert("L'image est trop grande. La taille maximale est de 5 Mo.");
      return;
    }

    setImage(selectedImage);
    setImageChanged(true); // Mark image as changed
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post("http://localhost:5000/user/uploadProfileImage", formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // If the image is uploaded successfully, update the profile
      setImageUrl(response.data.imageUrl); // Store the image URL
      setProfile({
        ...profile,
        image: response.data.imageUrl, // Update the profile image URL
      });
      alert('Image mise à jour avec succès!');
      setImageChanged(false); // Reset the image changed flag
    } catch (err) {
      alert('Erreur lors du téléchargement de l\'image');
    }
  };

  if (loading) return <MDBSpinner size="lg" role="status" tag="span" className="d-block mx-auto my-5" />;

  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <AppLayout>
      <div className="gradient-custom-2" style={{ backgroundColor: '#a1c4fd', marginTop: '40px', height: '100%' }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="12" xl="12">
              <MDBCard className="shadow-lg border-0 rounded-5">
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#3b8d99', height: '220px' }}>
                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                    <MDBCardImage
                      src={profile.image || imageUrl || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"} 
                      alt="Profile Image"
                      className="mt-4 mb-2 img-thumbnail"
                      fluid
                      style={{ width: '150px', border: '4px solid white', zIndex: '1', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                    />
                    <div>
                      <input type="file" onChange={handleImageChange} className="mb-2" />
                      <MDBBtn
                        outline
                        color="dark"
                        style={{ height: '36px', overflow: 'visible' }}
                        onClick={handleImageUpload}
                        disabled={!imageChanged} // Disable until image is selected
                      >
                        Télécharger l'image
                      </MDBBtn>
                    </div>
                  </div>
                  <div className="ms-3" style={{ marginTop: '200px' }}>
                    <MDBTypography tag="h4" style={{ fontWeight: 'bold', fontSize: '24px' }}>
                      {profile.firstname} {profile.lastname}
                    </MDBTypography>
                    <MDBCardText style={{ fontSize: '18px', fontStyle: 'italic' }}>{profile.country}</MDBCardText>
                  </div>
                </div>
                <MDBCardBody className="text-black p-4 mt-50" style={{ marginTop: '200px' }}>
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1" style={{ fontSize: '20px', fontWeight: '600' }}>À propos</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                      <MDBCardText className="font-italic mb-1">Téléphone : {profile.phone}</MDBCardText>
                      <MDBCardText className="font-italic mb-1">Email : {profile.email}</MDBCardText>
                      <MDBCardText className="font-italic mb-1">Société : {profile.companyname}</MDBCardText>
                      <MDBCardText className="font-italic mb-1">Adresse : {profile.address}</MDBCardText>
                      <MDBCardText className="font-italic mb-1">Statut : {profile.status}</MDBCardText>
                      <MDBCardText className="font-italic mb-1">Types de production : {profile.productionType.join(", ")}</MDBCardText>
                      <MDBCardText className="font-italic mb-1">Méthodes de production : {profile.productionMethod.join(", ")}</MDBCardText>
                      {profile.certification && <MDBCardText className="font-italic mb-1">Certification : {profile.certification}</MDBCardText>}
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </AppLayout>
  );
}
