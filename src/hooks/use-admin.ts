'use client';
import { useDoc, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

export function useAdmin() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const adminRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'roles_admin', user.uid);
  }, [user, firestore]);

  const { data: adminDoc, isLoading: isAdminLoading } = useDoc(adminRef);

  return {
    isAdmin: !!adminDoc,
    isLoading: isUserLoading || isAdminLoading,
  };
}
