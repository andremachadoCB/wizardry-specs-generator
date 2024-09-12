import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### access_log

| name       | type                     | format | required |
|------------|--------------------------|--------|----------|
| id         | int8                     | number | true     |
| created_at | timestamp with time zone | string | true     |

Note: 
- 'id' is the Primary Key.
- 'created_at' has a default value of now().

No foreign key relationships are defined for this table.
*/

export const useAccessLogs = () => useQuery({
    queryKey: ['access_logs'],
    queryFn: () => fromSupabase(supabase.from('access_log').select('*')),
});

export const useAccessLog = (id) => useQuery({
    queryKey: ['access_log', id],
    queryFn: () => fromSupabase(supabase.from('access_log').select('*').eq('id', id).single()),
    enabled: !!id,
});

export const useAddAccessLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newLog) => fromSupabase(supabase.from('access_log').insert([newLog])),
        onSuccess: () => {
            queryClient.invalidateQueries('access_logs');
        },
    });
};

export const useUpdateAccessLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('access_log').update(updateData).eq('id', id)),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries('access_logs');
            queryClient.invalidateQueries(['access_log', variables.id]);
        },
    });
};

export const useDeleteAccessLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('access_log').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('access_logs');
        },
    });
};