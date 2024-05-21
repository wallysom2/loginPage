import { render, screen } from '@testing-library/react';
import { useProfile } from '../useProfile';
import { getProfile } from './../../services/profileService';

vi.mock('../../services/profileService', () => ({
  getProfile: vi.fn(),
}));

const TestComponent = () => {
  const profile = useProfile();
  return (
    <div>
      {profile ? (
        <>
          <p>{profile.name}</p>
          <p>{profile.email}</p>
          <img src={profile.avatar.image_high_url} alt="avatar" />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

describe('useProfile', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('fetches and displays profile data', async () => {
    const mockProfile = {
      avatar: {
        image_high_url: 'high.jpg',
        image_medium_url: 'medium.jpg',
        image_low_url: 'low.jpg',
      },
      name: 'John Doe',
      email: 'john@example.com',
    };

    // Use vitest's mocking features
    (getProfile as jest.MockedFunction<typeof getProfile>).mockResolvedValue(
      mockProfile,
    );

    render(<TestComponent />);

    // Verify loading state initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the profile data to be fetched and the component to update
    await screen.findByText('John Doe');

    // Verify profile data after loading
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByAltText('avatar')).toHaveAttribute('src', 'high.jpg');
  });
});
