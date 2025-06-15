import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">User Information</h3>
            <p>
              <strong>Name:</strong> {user.name || 'N/A'}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
