import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import "./StockManagement.css";

function StockManagement() {
  const [harvests, setHarvests] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    category: "harvest",
    type: "wheat",
    name: "",
    quantity: 0,
    unit: "t",
  });
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000/stock";

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const config = { withCredentials: true };
        const harvestsResponse = await axios.get(`${API_URL}/harvests`, config);
        const inputsResponse = await axios.get(`${API_URL}/inputs`, config);
        setHarvests(harvestsResponse.data);
        setInputs(inputsResponse.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des stocks :", err);
        setError("Échec du chargement des données.");
      }
    };
    fetchStockData();
  }, []);

  const handleAddItem = async () => {
    try {
      const config = { withCredentials: true };
      const response = await axios.post(API_URL, newItem, config);
      if (newItem.category === "harvest") {
        setHarvests([...harvests, response.data]);
      } else {
        setInputs([...inputs, response.data]);
      }
      setShowAddModal(false);
      setNewItem({ category: "harvest", type: "wheat", name: "", quantity: 0, unit: "t" });
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
      setError("Échec de l'ajout de l'item.");
    }
  };

  const handleUpdateQuantity = async (id, category, change) => {
    try {
      const itemList = category === "harvest" ? harvests : inputs;
      const item = itemList.find((i) => i._id === id);
      const newQuantity = Math.max(0, item.quantity + change);
      const config = { withCredentials: true };
      const response = await axios.put(`${API_URL}/${id}`, { quantity: newQuantity }, config);
      if (category === "harvest") {
        setHarvests(harvests.map((i) => (i._id === id ? response.data : i)));
      } else {
        setInputs(inputs.map((i) => (i._id === id ? response.data : i)));
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      setError("Échec de la mise à jour de la quantité.");
    }
  };

  return (
    <div className="stock-management-container">
      <div className="stock-management-content">
        <div className="header-section">
          <h2>Gestion des Stocks</h2>
          <Button variant="success" onClick={() => setShowAddModal(true)}>
            Ajouter un produit
          </Button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {/* Tableaux Récoltes */}
        <div className="table-section">
          <h3>Récoltes</h3>
          <div className="custom-table">
            <div className="table-header">
              <div>Type</div>
              <div>Nom</div>
              <div>Quantité</div>
              <div>Unité</div>
              <div>Actions</div>
            </div>
            {harvests.length > 0 ? (
              harvests.map((item) => (
                <div className="table-row" key={item._id}>
                  <div>{item.type}</div>
                  <div>{item.name}</div>
                  <div>{item.quantity}</div>
                  <div>{item.unit}</div>
                  <div className="action-buttons">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleUpdateQuantity(item._id, "harvest", 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleUpdateQuantity(item._id, "harvest", -1)}
                    >
                      -
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="table-empty">Aucune récolte en stock</div>
            )}
          </div>
        </div>

        {/* Tableaux Intrants */}
        <div className="table-section">
          <h3>Intrants</h3>
          <div className="custom-table">
            <div className="table-header">
              <div>Type</div>
              <div>Nom</div>
              <div>Quantité</div>
              <div>Unité</div>
              <div>Actions</div>
            </div>
            {inputs.length > 0 ? (
              inputs.map((item) => (
                <div className="table-row" key={item._id}>
                  <div>{item.type}</div>
                  <div>{item.name}</div>
                  <div>{item.quantity}</div>
                  <div>{item.unit}</div>
                  <div className="action-buttons">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleUpdateQuantity(item._id, "input", 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleUpdateQuantity(item._id, "input", -1)}
                    >
                      -
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="table-empty">Aucun intrant en stock</div>
            )}
          </div>
        </div>

        {/* Modal pour ajouter un produit */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter un produit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Catégorie</Form.Label>
                <Form.Select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                >
                  <option value="harvest">Récolte</option>
                  <option value="input">Intrant</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  value={newItem.type}
                  onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                >
                  {newItem.category === "harvest" ? (
                    <>
                      <option value="wheat">Blé (Wheat)</option>
                      <option value="barley">Orge (Barley)</option>
                      <option value="other_cereals">Autres céréales</option>
                    </>
                  ) : (
                    <>
                      <option value="pesticide">Pesticide</option>
                      <option value="fertilizer">Engrais</option>
                      <option value="seeds">Semences</option>
                    </>
                  )}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="Entrez le nom (ex. Roundup, Semences de blé)"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Quantité</Form.Label>
                <Form.Control
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: parseFloat(e.target.value) })}
                  min="0"
                  step="0.1"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Unité</Form.Label>
                <Form.Select
                  value={newItem.unit}
                  onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                >
                  {newItem.category === "harvest" ? (
                    <>
                      <option value="t">Tonnes (t)</option>
                      <option value="kg">Kilogrammes (kg)</option>
                      <option value="bushels">Boisseaux (bushels)</option>
                      <option value="sacks">Sacs</option>
                    </>
                  ) : (
                    <>
                      <option value="L">Litres (L)</option>
                      <option value="kg">Kilogrammes (kg)</option>
                      <option value="t">Tonnes (t)</option>
                      <option value="sacks">Sacs</option>
                    </>
                  )}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Annuler
            </Button>
            <Button variant="primary" onClick={handleAddItem}>
              Ajouter
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default StockManagement;