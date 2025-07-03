import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Wheat, Truck, ShoppingBasket, ArrowRight } from 'lucide-react';
import { NioSection, NioButton } from '../../components';

// Utility for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

const roles = [
  {
    id: 'farmer',
    title: 'Agriculteur',
    subtitle: 'Le cœur de l’agriculture moderne',
    description: 'Optimisez vos rendements avec des données précises et des analyses prédictives avancées.',
    icon: Wheat,
    variant: 'farmer',
    gradient: 'from-green-500 via-emerald-600 to-green-700',
    textColor: 'text-gray-900',
    bgPattern: 'bg-green-300',
    stats: [
      { label: 'Agriculteurs actifs', value: '5.2K+', icon: 'ni ni-users' },
      { label: 'Rendement moyen', value: '+23%', icon: 'ni ni-trending-up' },
      { label: 'Temps économisé', value: '15h/sem', icon: 'ni ni-clock' },
    ],
    features: [
      'Analyse des sols en temps réel',
      'Prédictions météorologiques',
      'Gestion des cultures optimisée',
      'Marketplace intégrée',
    ],
  },
  {
    id: 'transporter',
    title: 'Transporteur',
    subtitle: 'La logistique intelligente',
    description: 'Optimisez vos routes et réduisez vos coûts avec notre système de planification intelligent.',
    icon: Truck,
    variant: 'transporter',
    gradient: 'from-pink-500 via-rose-600 to-red-700',
    textColor: 'text-gray-900',
    bgPattern: 'bg-pink-300',
    stats: [
      { label: 'Transporteurs', value: '1.8K+', icon: 'ni ni-users' },
      { label: 'Coûts réduits', value: '-18%', icon: 'ni ni-trending-up' },
      { label: 'Routes optimisées', value: '95%', icon: 'ni ni-clock' },
    ],
    features: [
      'Planification automatique des routes',
      'Suivi en temps réel',
      'Gestion des stocks mobiles',
      'Réseau de partenaires',
    ],
  },
  {
    id: 'distributor',
    title: 'Distributeur',
    subtitle: 'Le pont vers les consommateurs',
    description: 'Connectez-vous directement aux producteurs et optimisez votre chaîne d’approvisionnement.',
    icon: ShoppingBasket,
    variant: 'distributor',
    gradient: 'from-blue-500 via-indigo-600 to-purple-700',
    textColor: 'text-gray-900',
    bgPattern: 'bg-blue-300',
    stats: [
      { label: 'Distributeurs', value: '3.1K+', icon: 'ni ni-users' },
      { label: 'Profit augmenté', value: '+31%', icon: 'ni ni-trending-up' },
      { label: 'Commandes traitées', value: '2.4K/j', icon: 'ni ni-clock' },
    ],
    features: [
      'Accès direct aux producteurs',
      'Négociation en temps réel',
      'Gestion automatisée des stocks',
      'Analytics avancées',
    ],
  },
];

const SignupForm = ({ role, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    country: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted for', role.title, formData);
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-white/95 backdrop-blur-xl rounded-3xl p-6 z-10 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h4 className={cn("text-lg font-bold", role.textColor)}>
          Rejoindre en tant que {role.title}
        </h4>
        <button
          onClick={onClose}
          aria-label="Fermer le formulaire"
          className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          ×
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <label htmlFor={`${role.id}-fullName`} className="text-xs font-medium text-gray-700">
            Nom complet
          </label>
          <input
            id={`${role.id}-fullName`}
            type="text"
            placeholder="Votre nom complet"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
            className="form-control border-gray-200 focus:border-current focus:ring-1 focus:ring-current"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor={`${role.id}-email`} className="text-xs font-medium text-gray-700">
            Email
          </label>
          <input
            id={`${role.id}-email`}
            type="email"
            placeholder="votre@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="form-control border-gray-200 focus:border-current focus:ring-1 focus:ring-current"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor={`${role.id}-password`} className="text-xs font-medium text-gray-700">
            Mot de passe
          </label>
          <input
            id={`${role.id}-password`}
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="form-control border-gray-200 focus:border-current focus:ring-1 focus:ring-current"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor={`${role.id}-country`} className="text-xs font-medium text-gray-700">
            Pays
          </label>
          <select
            id={`${role.id}-country`}
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="form-select border-gray-200 focus:border-current focus:ring-1 focus:ring-current"
            required
          >
            <option value="" disabled>Sélectionnez votre pays</option>
            <option value="fr">France</option>
            <option value="us">États-Unis</option>
            <option value="ca">Canada</option>
            <option value="br">Brésil</option>
            <option value="de">Allemagne</option>
            <option value="es">Espagne</option>
          </select>
        </div>
        <NioButton
          className={cn("w-100", `btn-${role.variant}`, `bg-gradient-to-r ${role.gradient} text-white`)}
          label={`Créer mon compte ${role.title}`}
        />
      </form>
    </div>
  );
};

const NioSectionSignUp = () => {
  const [isFormOpen, setIsFormOpen] = useState({ farmer: false, transporter: false, distributor: false });

  const toggleForm = (roleId) => {
    setIsFormOpen((prev) => ({
      ...prev,
      [roleId]: !prev[roleId],
    }));
  };

  return (
    <NioSection className="nk-section-roles py-5 py-lg-7 bg-light">
       <NioSection.Head alignX="center">
          <h2>
            HarvestFlow <span className="text-indigo">S’Adapte à Vous</span>
          </h2>
          <p className="fs-5 text-muted mb-0">
            Que vous cultiviez, transportiez ou distribuiez, notre plateforme vous connecte au cœur de l’agriculture moderne.
          </p>
        </NioSection.Head>
      <NioSection.Content>
        <Row className="g-4 align-items-stretch justify-content-center">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Col
                key={role.id}
                md={4}
                lg={4}
                xl={4}
                className="d-flex"
              >
                <div
                  className={cn(
                    "role-card rounded-3 w-100",
                    "relative overflow-hidden border border-gray-100 shadow-lg"
                  )}
                  style={{
                    background: '#ffffff',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    minHeight: '350px',
                    height: '100%',
                  }}
                >
                  <div className={cn("h-[20px]", `bg-gradient-to-r ${role.gradient}`)}></div>
                  <div className="p-3">
                    <div className="relative z-10">
                      <div
                        className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center mb-3",
                          `bg-gradient-to-br ${role.gradient}`,
                          "shadow-lg shadow-current/25"
                        )}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="space-y-1">
                        <h3 className={cn("text-2xl font-bold", role.textColor)}>
                          {role.title}
                        </h3>
                        <p className={cn("font-medium text-sm bg-clip-text text-transparent", `bg-gradient-to-r ${role.gradient}`)}>
                          {role.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="pt-3">
                      <p className="text-gray-700 text-sm mb-3">{role.description}</p>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {role.stats.map((stat, i) => (
                          <div key={i} className="text-center">
                            <div className={cn("w-7 h-7 rounded-xl mx-auto mb-1 flex items-center justify-center", role.bgPattern)}>
                              <i className={cn(stat.icon, role.textColor)}></i>
                            </div>
                            <div className={cn("text-sm font-bold", role.textColor)}>
                              {stat.value}
                            </div>
                            <div className="text-xs text-gray-600 leading-tight">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2 mb-4">
                        {role.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className={cn("w-2 h-2 rounded-full", `bg-gradient-to-r ${role.gradient}`)}></div>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-auto">
                        <NioButton
                          onClick={() => toggleForm(role.id)}
                          className={cn("w-100", `bg-gradient-to-r ${role.gradient} text-white`)}
                          label={
                            <span className="flex items-center justify-center gap-2">
                              Rejoindre maintenant
                              <ArrowRight className="w-4 h-4" />
                            </span>
                          }
                        />
                      </div>
                      {isFormOpen[role.id] && (
                        <SignupForm role={role} onClose={() => toggleForm(role.id)} />
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
        <div className="mt-5 text-center">
          <div className="flex flex-wrap justify-center items-center gap-4 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <i className="ni ni-users"></i>
              <span>+10,000 utilisateurs actifs</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ni ni-trending-up"></i>
              <span>+25% de productivité moyenne</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ni ni-clock"></i>
              <span>Disponible 24h/7j</span>
            </div>
          </div>
        </div>
      </NioSection.Content>
      <style jsx>{`
        .role-card {
          transition: all 0.3s ease;
        }
        .role-card:hover {
          transform: scale(1.03);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
        }
        .animate-slide-up {
          animation: slideIn 0.7s ease backwards;
        }
        .signup-form {
          animation: slideIn 0.3s ease;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 991px) {
          .role-card {
            margin-bottom: 1rem;
            width: 100%;
          }
        }
      `}</style>
    </NioSection>
  );
};

export default NioSectionSignUp;