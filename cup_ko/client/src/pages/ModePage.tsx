import React from 'react';
import { useNavigate } from 'react-router-dom';
import cart from '../assets/cart.png';

// Import your newly created components
import PageLayout from '../components/PageLayout';
import PinkCard from '../components/PinkCard';
import InfoBlock from '../components/InfoBlock';

const ModePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <PageLayout>
            <PinkCard title="mode of buying" icon={cart}>
                
                <InfoBlock 
                    title="Physical Store" 
                    description="Buying from the physical store means you are in line and will wait for your order in the physical store." 
                />
                
                <InfoBlock 
                    title="Delivery" 
                    description="Mode of buying through delivery means your product will be delivered to you only available for classroom delivery in any school building." 
                />
                
                <InfoBlock 
                    title="Reservation" 
                    description="Reservation means your product will be reserved for you and will be picked up when available or on a scheduled date by you or any person who will get it." 
                />
                
            </PinkCard>
        </PageLayout>
    );
};

export default ModePage;