from backend.database import supabase

def inspect():
    try:
        response = supabase.table("certificates").select("*").limit(1).execute()
        if response.data:
            print("Columns:", response.data[0].keys())
        else:
            print("No data found, cannot inspect columns.")
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    inspect()
