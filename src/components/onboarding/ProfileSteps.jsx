import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export const LawyerProfileStep = ({ profile, onChange, onSubmit }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold mb-4">Complete Your Lawyer Profile</h2>

    <div>
      <Label>Firm Name</Label>
      <Input
        value={profile.firm_name}
        onChange={(e) => onChange({ firm_name: e.target.value })}
        placeholder="Enter firm name"
      />
    </div>

    <div>
      <Label>License Number</Label>
      <Input
        value={profile.license_number}
        onChange={(e) => onChange({ license_number: e.target.value })}
        placeholder="Enter license number"
      />
    </div>

    {/* Add other lawyer fields */}

    <Button onClick={onSubmit} className="w-full">
      Submit Profile
    </Button>
  </div>
);

export const SurveyorProfileStep = ({ profile, onChange, onSubmit }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold mb-4">Complete Your Surveyor Profile</h2>

    <div>
      <Label>Company Name</Label>
      <Input
        value={profile.company_name}
        onChange={(e) => onChange({ company_name: e.target.value })}
        placeholder="Enter company name"
      />
    </div>

    {/* Add other surveyor fields */}

    <Button onClick={onSubmit} className="w-full">
      Submit Profile
    </Button>
  </div>
);

export const CompleteProfileStep = ({ onNext }) => (
  <div className="text-center">
    <Lottie
      animationData={successAnimation}
      loop={false}
      className="w-48 h-48 mx-auto"
    />
    <h2 className="text-2xl font-bold mb-4">Almost There!</h2>
    <p className="text-gray-600 mb-6">
      Let's complete your personal profile to get the most out of ProPut.
    </p>
    <Button onClick={onNext} className="w-full">
      Complete Profile
    </Button>
  </div>
);
