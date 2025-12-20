from backend.database import supabase

def delete_invalid():
    try:
        # Delete project where title is 'nah'
        response = supabase.table("projects").delete().eq("title", "nah").execute()
        print("Deleted:", response.data)
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    delete_invalid()
